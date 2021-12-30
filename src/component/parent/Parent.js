import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Parent = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios('https://teezarat-new-backend.herokuapp.com/category/get')
            .then(res => setProducts(res.data.data))
    }, [])

    const parentProducts = products.filter(pd => pd.parent_id === null)
    console.log(parentProducts)
    return (
        <div className='container mt-5'>

            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            {/* Main Category = {item.name} */}
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-mdb-parent="#accordionExample"
                    >
                        <div className="accordion-body">

                            {/* {menuItemChildren} */}
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Parent;



