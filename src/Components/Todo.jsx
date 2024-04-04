import React from "react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Todoitem from "./Todoitem";
import { handletodo } from "../Redux/Todo/action";
import { useState } from "react";
import Loading from "./Loading";
import Error from "./Error";
import { handleloading } from "../Redux/Todo/action";
import { handleerror } from "../Redux/Todo/action";
import style from "../Css/Todo.module.css";
import { handletheme } from "../Redux/Todo/action";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [etitle, setEtitle] = useState("");
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [editshow, setEditshow] = useState(false);

  const alltodo = useSelector((state) => {
    return state.todo;
  });

  const decider = useSelector((state) => {
    return state.extra;
  });


  const themeSh = useSelector((state) => {
    return state.thememainweb;
  });
  console.log(themeSh.theme)

  const getTodoData = async () => {
    try {
      dispatch(handleloading(true));
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/todos",
      });
      // console.log(data);
      dispatch(handletodo(data));
      dispatch(handleloading(false));
    } catch (error) {
      dispatch(handleloading(false));
      dispatch(handleerror(true));
      console.log(error);
    }
  };

  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleAdd();
    setTitle("");
  }

  const handleAdd = async () => {
    try {
      let obj = { title: title, status: false };
      await axios({
        method: "post",
        url: "http://localhost:3000/todos",
        data: obj,
      });
      getTodoData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/todos/${id}`,
      });
      getTodoData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id, val) => {
    try {
      let obj = { status: !val };
      await axios({
        method: "patch",
        url: `http://localhost:3000/todos/${id}`,
        data: obj,
      });
      getTodoData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditis = async () => {
    try {
      let obj = { title: etitle };
      await axios({
        method: "patch",
        url: `http://localhost:3000/todos/${id}`,
        data: obj,
      });
      getTodoData();
      setEtitle("");
    } catch (error) {
      console.log(error);
    }
  };

  function handleeditTitle(val, val2) {
    setEtitle(val);
    setId(val2);
    setEditshow(true);
  }

  function handleThemeChange(){
    dispatch(handletheme())
  }

  function handleEchange(event) {
    setEtitle(event.target.value);
  }

  function handleGoShow() {
    setEditshow(false);
  }

  useEffect(() => {
    getTodoData();
  }, []);

  if (decider.loading) {
    return <Loading />;
  }

  if (decider.error) {
    return <Error />;
  }

  return (
    <div className={themeSh.theme ? style.maindiv: style.maindivblack}>
      <div className={style.maindiv1}>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="enter title"
            value={title}
            onChange={handleTitle}
            className={style.chakrainput}
          />
          <Button type="submit" className={themeSh.theme ?style.button1:style.button1black}>
            Add Todo
          </Button>
          <Button className={themeSh.theme ?style.button1:style.button1black} onClick={handleThemeChange}>{themeSh.theme ? "Light" : "Dark"}</Button>
        </form>
      </div>

      {editshow && (
        <div className={style.maindiv1}>
          <Input
            value={etitle}
            onChange={handleEchange}
            className={style.chakrainput}
          />
          <Button
            type="submit"
            onClick={() => {
              handleEditis(), handleGoShow();
            }}
            className={themeSh.theme ?style.button1:style.button1black}
          >
            Edit Title
          </Button>
        </div>
      )}

      <div style={{ marginTop: "50px" }}>
        <div className={style.showgrid}>
          {alltodo.map((ele) => {
            return (
              <Todoitem
                key={ele.id}
                {...ele}
                handleDelete={handleDelete}
                handleStatus={handleStatus}
                handleeditTitle={handleeditTitle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
