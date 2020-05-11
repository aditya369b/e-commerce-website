import React from "react";

/** Buyer/Seller  dashboard */
const HomePage = () => {


    const [itemLists, setItemList] = React.useState(
        [{
            itemName: "Mac and Cheese",
            itemId: "01",
            itemCost: "100$",
            itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        },
        {
            itemName: "Mac and Cheese",
            itemId: "02",
            itemCost: "200$",
            itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        },
        {
            itemName: "Mac and Cheese",
            itemId: "03",
            itemCost: "300$",
            itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        },
        {
            itemName: "Mac and Cheese",
            itemId: "04",
            itemCost: "400$",
            itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        },
        {
            itemName: "Mac and Cheese",
            itemId: "05",
            itemCost: "500$",
            itemDecription: "Macaroni and cheese—also called mac n' cheese in the US and Canadian English, macaroni cheese in the United Kingdom—is a dish of English origin, consisting of cooked macaroni pasta and a cheese sauce, most commonly cheddar."
        },
        ]
    );
    return (<div>
        <ol>
            {itemLists.map((item, i) => (< li key={i} id={i} > {item.itemName} {item.itemCost} </li>))}
        </ol >
    </div>
    );
};

export default HomePage;