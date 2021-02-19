import React from "react";

// use container without worrying about class name
export function Container({ fluid, children }) {
  return <div className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
}

// use row without worrying about class name
export function Row({ fluid, children }) {
  return <div className={`row${fluid ? "-fluid" : ""}`}>{children}</div>;
}

// make columns with less syntax
export function Col({ size, children }) {
  return (
    <div
      className={size
        .split(" ")
        .map(size => "col-" + size)
        .join(" ")}
    >
      {children}
    </div>
  );
}