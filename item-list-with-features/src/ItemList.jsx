import React, { useCallback, useState } from "react";
import { Item } from "./Item";

export const ItemList = () => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  const addList = useCallback(
    (val) => {
      setList([...list, val]);
      setValue("");
    },
    [list]
  );

  const handleSubmit = useCallback(() => {
    addList(value);
  }, [value, addList]);

  return (
    <>
      <div className="columns">
        <div className="column">
          <div className="content">
            {list.map((item, index) => {
              return (
                <Item
                  item={item}
                  index={index}
                  onEdit={(newVal) => {
                    const newList = list;
                    newList[index] = newVal;
                    setList([...newList]);
                  }}
                  onDelete={() => {
                    setList([
                      ...list.filter((v, i) => {
                        return i !== index;
                      }),
                    ]);
                  }}
                />
              );
            })}
            <div className="columns">
              <input
                className="input"
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  console.log("val", e.target.value);
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
