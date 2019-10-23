import React, { useState, useRef, useEffect } from 'react';
import { Trash2 as Trash, Circle, CheckCircle } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  addNewTask,
  ToggleTaskStatus,
  deleteTask,
  editTask
} from '../../actions/tasksActions';
import './Dashboard.scss';
import DICT from './Dashboard.dict.json';

const StatusBar = ({ taskNumber }) => {
  return (
    <div className=" status-bar bg-white text-sm text-center bg-light rounded-lg p-1 py-4 my-4 mx-auto">
      <p className="text-sm hidden-md-down my-2">
        {DICT['en'].TODAY}, {moment().format('DD MMM YYYY')}
      </p>
      <p className="font-weight-bold text-md my-1">
        {DICT['en'].YOU_HAVE} ({taskNumber}) {DICT['en'].TODO_TODAY}
      </p>
    </div>
  );
};
function TaskInput({ closeTaskForm }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(() => moment().format('YYYY-MM-DD'));
  const onInputNoteChange = ({ target: { value } }) => setNote(value);
  const onInputDateChange = ({ target: { value } }) => {
    console.log(value);
    setDate(value);
  };
  const sumbitNewTask = () => {
    const data = {
      note: note,
      completed: false,
      completedAt: '',
      date: date,
      time: '',
      createdAt: Date.now()
    };
    addNewTask(dispatch, data);
  };
  const SubmitTask = event => {
    event.preventDefault();
    sumbitNewTask();
    closeTaskForm();
  };

  return (
    <form className="row p-4 shadow rounded" onSubmit={SubmitTask}>
      <div className="col-12 col-md-5">
        <input
          className="input-lg rounded"
          type="text"
          ref={ref}
          value={note}
          onChange={onInputNoteChange}
          placeholder={DICT['en'].ADD_TASK_PLACEHOLDER}
        />
      </div>
      <div className="col-12 col-md-5">
        <input
          className="input-lg rounded"
          placeholder={moment().format('YYYY-MM-DD')}
          type="date"
          value={date}
          onChange={onInputDateChange}
          name="date"
          min={moment().format('YYYY-MM-DD')}
        />
      </div>
      <div className="col-12 row">
        <button
          className="btn btn-sm btn-outline-primary rounded block-md-down "
          onClick={SubmitTask}
        >
          {DICT['en'].BTN_ADD}
        </button>
        <button
          className=" btn btn-sm btn-outline-light text-grey  rounded block-md-down"
          onClick={closeTaskForm}
        >
          {DICT['en'].BTN_CANCEL}
        </button>
      </div>
    </form>
  );
}
function TaskEdit({
  match: {
    params: { taskId }
  }
}) {
  let history = useHistory();
  let { list } = useSelector(state => state.tasks);
  let taskToEdit = list.filter(task => task.id === taskId)[0] || {};
  const dispatch = useDispatch();
  const ref = useRef(null);
  useEffect(() => {
    list.length > 0 && ref.current.focus();
  }, [list.length]);
  const [note, setNote] = useState(taskToEdit.note);
  const [date, setDate] = useState(
    moment(taskToEdit.date).format('YYYY-MM-DD')
  );
  const onInputNoteChange = ({ target: { value } }) => setNote(value);
  const onInputDateChange = ({ target: { value } }) => setDate(value);

  const submitEditTask = () => {
    const data = {
      note: note,
      date: date,
      editedAt: Date.now()
    };
    editTask(dispatch, taskId, data, history);
  };
  const SubmitTask = event => {
    event.preventDefault();
    submitEditTask();
  };
  return (
    <>
      {list.length > 0 ? (
        <form className="row p-4 shadow rounded" onSubmit={SubmitTask}>
          <div className="col-12 col-md-5">
            <input
              className="input-lg rounded"
              type="text"
              ref={ref}
              value={note}
              onChange={onInputNoteChange}
              placeholder={DICT['en'].ADD_TASK_PLACEHOLDER}
            />
          </div>
          <div className="col-12 col-md-5">
            <input
              className="input-lg rounded"
              placeholder={moment().format('YYYY-MM-DD')}
              type="date"
              value={date}
              onChange={onInputDateChange}
              name="date"
              min={moment().format('YYYY-MM-DD')}
            />
          </div>
          <div className="col-12 row">
            <button
              className="btn btn-sm btn-outline-primary rounded block-md-down "
              onClick={SubmitTask}
            >
              {DICT['en'].BTN_SAVE}
            </button>
            <button
              className=" btn btn-sm btn-outline-light text-grey  rounded block-md-down"
              onClick={() => history.push('/dashboard')}
            >
              {DICT['en'].BTN_CANCEL}
            </button>
          </div>
        </form>
      ) : (
        <h1>there is nothing to edit</h1>
      )}
    </>
  );
}
function TaskRow({ task }) {
  let { url } = useRouteMatch();
  let history = useHistory();
  const dispatch = useDispatch();
  const { id, note, completed, date } = task;
  const editTask = id => {
    console.log(id);
    history.push(`${url}/edit/${id}`);
  };
  return (
    <div className="task-row row align-items-center rounded-lg mb-3 p-4 ">
      <div className="col-xs-1 ">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="check"
            onChange={() => ToggleTaskStatus(dispatch, id)}
            checked={completed}
          />
          {completed ? (
            <CheckCircle className="checkbox" />
          ) : (
            <Circle className="checkbox" />
          )}
        </label>
      </div>
      <div className="col-xs-10 col-md-10" onClick={() => editTask(id)}>
        <div className="row align-items-center">
          <div className="col-12 col-md-9  task-note py-2">
            <span>{note}</span>
          </div>
          <div className="col-12 col-md-2 date">
            <span className="text-xs text-grey ">
              {moment(date).format('DD-MMM-YYYY')}
            </span>
          </div>
        </div>
      </div>
      <div className="col-xs-1 ">
        <Trash
          className="icon "
          size="18"
          onClick={() => deleteTask(dispatch, id)}
        />
      </div>
    </div>
  );
}
const TaskLister = ({ list }) => {
  return (
    <>
      {list.length > 0 ? (
        list.map(item => <TaskRow key={item.id} task={item} />)
      ) : (
        <p className="text-center">{DICT['en'].NO_TASK}</p>
      )}
    </>
  );
};

function Dashboard({ match: { path } }) {
  console.log(`${path}/edit`);
  let { list } = useSelector(state => state.tasks);
  const [showInput, setShowInput] = useState(false);
  const openTaskForm = () => setShowInput(true);
  const closeTaskForm = () => setShowInput(false);
  const taskNumber = list.length;
  return (
    <div className="container">
      <div className="px-4">
        <StatusBar taskNumber={taskNumber} />

        <Switch>
          <Route
            exact
            path={path}
            render={() => (
              <>
                <TaskLister list={list} />
                {!showInput && (
                  <button
                    onClick={openTaskForm}
                    className="btn btn-outline-primary rounded block-md-down"
                  >
                    {DICT['en'].BTN_NEW_TASK}
                  </button>
                )}
                {showInput && <TaskInput closeTaskForm={closeTaskForm} />}
              </>
            )}
          />

          <Route path={`${path}/edit/:taskId`} component={TaskEdit} />
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
