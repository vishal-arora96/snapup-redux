import React, { useEffect } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarClose, getSidebarStatus } from "../../store/sidebarSlice";
import {
  fetchAsyncCategories,
  getAllCategories
} from "../../store/categorySlice";

function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  return (
    <aside className={`sidebar ${isSidebarOpen ? "show-sidebar" : ""}`}>
      <button
        type="button"
        className="sidebar-hide-btn"
        onClick={() => dispatch(setSidebarClose())}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="sidebar-cnt">
        <div className="cat-title fs-17 text-uppercase fw-6 ls-1h">
          All Categories
        </div>
        <ul className="cat-list">
          {categories.map((category, idx) => {
            return (
              <li key={idx}>
                <Link
                  to={`category/${category}`}
                  className="cat-list-link text-capitalize"
                >
                  {category.replace("-", " ")}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
