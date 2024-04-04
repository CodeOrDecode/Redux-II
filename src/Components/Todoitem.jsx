import React from "react";
import { Button } from "@chakra-ui/react";
import style from "../Css/Todoitem.module.css";
import { useSelector } from "react-redux";

const Todoitem = ({
  id,
  title,
  status,
  handleDelete,
  handleStatus,
  handleeditTitle,
}) => {

  const themeSh = useSelector((state) => {
    return state.thememainweb;
  });
  console.log(themeSh.theme)



  return (
    <div className={themeSh.theme?style.todoitemdiv: style.todoitemdivblack}>
      <h3 style={{margin:"12px 0px"}}>{title}</h3>
      <Button
      className={themeSh.theme ?style.button1:style.button1black} 
        onClick={() => {
          handleStatus(id, status);
        }}
      >
        {status ? "completed" : "pending"}
      </Button>

      <Button
        className={themeSh.theme ?style.button1:style.button1black} 
        style={{marginLeft:"14px"}}
        onClick={() => {
          handleeditTitle(title, id);
        }}
      >
        Edit
      </Button>

      <Button
         className={themeSh.theme ?style.button1:style.button1black} 
        style={{marginLeft:"14px"}}
        onClick={() => {
          handleDelete(id);
        }}
      >
        Delete
      </Button>
    </div>
  );
};

export default Todoitem;
