import React from "react";

export const removePlayer = (button) => {
  let table = document.getElementById("roster1");
  console.log("removePlayer executed");
  table.deleteRow(button.parentNode.rowIndex); // button -> td -> tr.
};

export default removePlayer;
