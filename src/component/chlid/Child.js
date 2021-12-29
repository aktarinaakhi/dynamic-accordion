import React, { useState, useEffect } from "react";
import { UncontrolledCollapse } from "reactstrap";

const Menu = () => {
    const [loading, setLoading] = useState(true);
    // const [items, setItems] = useState([]);
    const [cats, setCats] = useState([])


    const url = 'https://teezarat-new-backend.herokuapp.com/category/get'
    const getData = async () => {
        try {
            const res = await fetch(url)
            const data = await res.json()
            const fetchedCategory = data.data
            const newCategory = [...fetchedCategory]
            for (let i = 0; i < fetchedCategory.length; i++) {
                const subs = fetchedCategory.filter(
                    (cat) => cat.parent_id === newCategory[i]._id
                )
                newCategory[i].subs = subs
            }
            const finalCategory = newCategory.filter((cat) => cat.parent_id === null)

            return finalCategory
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const getCats = async () => {
            const data = await getData()
            setCats(data)
        }
        getCats()
        console.log(cats)

        const returnMenuItem = (item, i) => {
            let menuItem;

            if (item.subs.length === 0) {
                menuItem = (
                    <div className="item" key={i}>
                        {item.name}
                    </div>
                );
            }
            else {
                let menuItemChildren = item.subs.map((item, i) => {
                    let menuItem = returnMenuItem(item, i);
                    return menuItem;
                });


                menuItem = (
                    <div key={i} className="item">
                        <div className="toggler" id={`toggle-menu-item-${item._id}`}>

                            {item.name}
                        </div>
                        <UncontrolledCollapse
                            className="children"
                            toggler={`#toggle-menu-item-${item._id}`}
                        >
                            {menuItemChildren}
                        </UncontrolledCollapse>

                    </div>
                );
            }
            return menuItem;
        };

        const load = async () => {
            setLoading(false);
            let menuItems = cats.map((item, i) => {
                let menuItem = returnMenuItem(item, i);
                return menuItem;
            });
            setCats(menuItems);
        };

        if (loading) {
            load();
        }
    }, []);

    return (
        <div>
            <div className='container mt-5 w-25'>
                <div className="accordion" id="accordionExample">


                    {cats.map(cat => <div className="accordion-item" key={cat._id} >
                        <h2 className="accordion-header" id="headingOne">
                            <button
                                className="accordion-button"
                                type="button"
                                data-mdb-toggle="collapse"
                                data-mdb-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                Main Category = {cat.name}
                            </button>


                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-mdb-parent="#accordionExample"
                        >
                            <div className="accordion-body">

                                {cat.subs.map(sub => <div className="ms-5 text-danger" key={sub._id}> {sub?.name}</div>)}
                                <button className="d-block mx-auto">add item</button>

                            </div>

                        </div>
                    </div>
                    )}
                </div>

            </div>

        </div>
    );


};

export default Menu;
