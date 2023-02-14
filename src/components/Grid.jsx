import React from "react";
import GridModule from "./Grid.module.css";

function Grid({ children }) {
	return <div className={GridModule.main}>{children}</div>;
}

export default Grid;
