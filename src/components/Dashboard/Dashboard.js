import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback
} from "react";
import { Trash2 as Trash, Circle, CheckCircle } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from "../../firebase";
import {
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  Redirect
} from "react-router-dom";
import { useSession } from "../session";
import moment from "moment";
import {
  addNewTask,
  ToggleTaskStatus,
  deleteTask,
  editTask,
  setTaskList
} from "../../actions/tasksActions";
import "./Dashboard.scss";
import DICT from "./Dashboard.dict.json";
import { logOut } from "../../actions/authActions";
import Navbar from "./Navbar";
import Sidebar from "../Sidebar";
function TaskInput({ closeTaskForm }) {
  const dispatch = useDispatch();
  const firebase = useContext(FirebaseContext);
  const { uid } = useSession();
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(() => moment().format("YYYY-MM-DD"));
  const onInputNoteChange = ({ target: { value } }) => setNote(value);
  const onInputDateChange = ({ target: { value } }) => {
    setDate(value);
  };
  const sumbitNewTask = () => {
    const data = {
      note: note,
      completed: false,
      completedAt: "",
      date: date,
      time: "",
      createdAt: Date.now()
    };
    addNewTask(dispatch, firebase, uid, data);
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
          placeholder={DICT["en"].ADD_TASK_PLACEHOLDER}
        />
      </div>
      <div className="col-12 col-md-5">
        <input
          className="input-lg rounded"
          placeholder={moment().format("YYYY-MM-DD")}
          type="date"
          value={date}
          onChange={onInputDateChange}
          name="date"
          min={moment().format("YYYY-MM-DD")}
        />
      </div>
      <div className="col-12 row">
        <button
          className="btn btn-sm btn-outline-primary rounded block-md-down "
          onClick={SubmitTask}
        >
          {DICT["en"].BTN_ADD}
        </button>
        <button
          className=" btn btn-sm btn-outline-light text-grey  rounded block-md-down"
          onClick={closeTaskForm}
        >
          {DICT["en"].BTN_CANCEL}
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
  const firebase = useContext(FirebaseContext);
  const { uid } = useSession();
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
    moment(taskToEdit.date).format("YYYY-MM-DD")
  );
  const onInputNoteChange = ({ target: { value } }) => setNote(value);
  const onInputDateChange = ({ target: { value } }) => setDate(value);

  const submitEditTask = () => {
    const data = {
      note: note,
      date: date,
      editedAt: Date.now()
    };
    editTask(dispatch, firebase, uid, taskId, data, history);
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
              placeholder={DICT["en"].ADD_TASK_PLACEHOLDER}
            />
          </div>
          <div className="col-12 col-md-5">
            <input
              className="input-lg rounded"
              placeholder={moment().format("YYYY-MM-DD")}
              type="date"
              value={date}
              onChange={onInputDateChange}
              name="date"
              min={moment().format("YYYY-MM-DD")}
            />
          </div>
          <div className="col-12 row">
            <button
              className="btn btn-sm btn-outline-primary rounded block-md-down "
              onClick={SubmitTask}
            >
              {DICT["en"].BTN_SAVE}
            </button>
            <button
              className=" btn btn-sm btn-outline-light text-grey  rounded block-md-down"
              onClick={() => history.push("/dashboard")}
            >
              {DICT["en"].BTN_CANCEL}
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
  const firebase = useContext(FirebaseContext);
  const { uid } = useSession();
  const { id, note, completed, date } = task;
  const editTask = id => {
    history.push(`${url}/edit/${id}`);
  };
  return (
    <div className="task-row row align-items-center rounded-lg mb-3 p-2 ">
      <div className=" ">
        <div className="mr-1">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="check"
              onChange={() => ToggleTaskStatus(dispatch, firebase, uid, id)}
              checked={completed}
            />
            {completed ? (
              <CheckCircle className="checkbox checked " />
            ) : (
              <Circle className="checkbox " />
            )}
          </label>
        </div>
      </div>
      <div className="col-xs-10 col-md-10 px-0" onClick={() => editTask(id)}>
        <div className="row align-items-center px-0">
          <div className="col-12 col-md-10  task-note my-0 px-0">
            <span>{note}</span>
          </div>
          <div className="col-12 col-md-2 date">
            <span className="text-xs text-grey ">
              {moment(date).format("DD-MMM-YYYY")}
            </span>
          </div>
        </div>
      </div>
      <div className="col-xs-1 ">
        <Trash
          className="icon "
          size="18"
          onClick={() => deleteTask(dispatch, firebase, uid, id)}
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
        <p className="text-center">{DICT["en"].NO_TASK}</p>
      )}
    </>
  );
};
const LogOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const firebase = useContext(FirebaseContext);
  return (
    <button
      className="btn btn-sm"
      onClick={() => logOut(dispatch, firebase, history)}
    >
      Log out
    </button>
  );
};

function Dashboard({ match: { path } }) {
  const dispatch = useDispatch();
  const firebase = useContext(FirebaseContext);
  const { isAuthenticated, uid } = useSession();
  const setUserTasksList = useCallback(() => {
    if (isAuthenticated) {
      setTaskList(dispatch, firebase, uid);
    }
  }, [dispatch, firebase, uid, isAuthenticated]);
  useEffect(() => {
    setUserTasksList();
    return () => setUserTasksList();
  }, [setUserTasksList]);
  let { list } = useSelector(state => state.tasks);

  const [showInput, setShowInput] = useState(false);
  const openTaskForm = () => setShowInput(true);
  const closeTaskForm = () => setShowInput(false);
  const taskNumber = list.length;

  return (
    <>
      {isAuthenticated ? (
        <div className="container">
          <div className="px-4">
            <LogOut />
            <Navbar DICT={DICT} taskNumber={taskNumber} />
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
                        {DICT["en"].BTN_NEW_TASK}
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
      ) : (
        <Redirect to="/landing" />
      )}
    </>
  );
}

export default Dashboard;
