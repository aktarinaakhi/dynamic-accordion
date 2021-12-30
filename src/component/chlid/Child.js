import React, { useState, useEffect } from "react";
import { UncontrolledCollapse } from "reactstrap";
import "./menu.css"

const Menu = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
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
            return finalCategory;

        }
        catch (error) {
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
                        {item?.name}
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

                            toggler={`#toggle-menu-item-${item._id}`}
                        // toggler="#toggler"
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
            let menuItems = cats?.map((item, i) => {
                let menuItem = returnMenuItem(item, i);
                return menuItem;
            });
            setItems(menuItems);
            console.log(items)
        };

        if (loading) {
            load();
        }
    }, [loading]);



    return <div className="items">{items.name}</div>

};

export default Menu;
