import React, { useCallback, useState } from "react";

export const Item = React.memo(({ item, onEdit, onDelete }) => {
  const [value, setValue] = useState(item);
  const [isEditing, setEditing] = useState(false);

  const addList = useCallback(
    (val) => {
      onEdit(val);
      setEditing(false);
    },
    [onEdit]
  );

  const handleSubmit = useCallback(() => {
    addList(value);
  }, [value, addList]);

  return (
    <div className={`columns item ${isEditing ? "active" : ""}`}>
      <div className="column">
        <div className="columns mb-1">
          <button
            className="button is-normal is-danger"
            onClick={() => {
              onDelete();
            }}
          >
            Delete
          </button>
          <button
            className="button is-normal is-info"
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </button>
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          {!isEditing && <p key={`${item}`}>{item}</p>}
          {isEditing && (
            <>
              <input
                className="input"
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.code === "Enter") {
                    addList(value);
                  }
                }}
              />
              <button className="button is-primary" onClick={handleSubmit}>
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
