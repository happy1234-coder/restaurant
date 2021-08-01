import React from "react";

function MenuItems({ cName, categories, hanldeInputChange }) {
  return (
    <div>
      {categories.map((categorie) => (
        <div key={categorie.id}>
          <h5 style={{ marginLeft: "2%" }}>{cName + " " + categorie.name}</h5>
          <div className="main-div">
            {categorie.menuItems.map((items) => {
              return (
                <div
                  key={items.id}
                  className="container"
                  onClick={() => {
                    document.getElementById(`checkbox-${items.id}`).click();
                  }}
                >
                  <div className="content">
                    <input
                      type="checkbox"
                      id={`checkbox-${items.id}`}
                      onChange={(e) => {
                        hanldeInputChange(e.target.checked, items);
                      }}
                    ></input>

                    <h4>{items.name}</h4>
                    <h5>{items.price}</h5>
                    <p>{items.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// stop rerendering by checking previous props
export default React.memo(MenuItems);
