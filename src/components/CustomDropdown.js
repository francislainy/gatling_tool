import React, {useCallback, useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ToolDataService from "../api/ToolDataService";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
        style={{color: "orange", textDecoration: "none"}}
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style} //todo: get style from parent element
                className={className}
                aria-labelledby={labeledBy}
            >
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

export function CustomDropdown() {

    const useFetchData = ({payload}) => {
        const [res, setRes] = useState({data: null, isLoading: false});

        const callAPI = useCallback(() => {
            setRes(prevState => ({...prevState, isLoading: true}));

            if (payload.categoryTitle !== '') {
                ToolDataService.createCategory(payload).then(res => {
                    setRes({data: res.data, isLoading: false});
                }).catch((error) => {
                    setRes({data: null, isLoading: false});
                })
            }
        }, [payload])
        return [res, callAPI];
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({categories: data.categories, isFetching: true});

                ToolDataService.retrieveCategories()
                    .then(response => setData({categories: response.data.categories, isFetching: false}))

            } catch (e) {
                console.log(e);
                setData({categories: data.categories, isFetching: false});
            }
        };
        fetchData().then(r => console.log(r))
    }, []);

    const handleChange = (e) => {

        setInput(e.currentTarget.value);
        console.log(e.currentTarget.value)
    }

    const [data, setData] = useState({categories: [], isFetching: false});
    const [input, setInput] = useState('');

    const [, addCategory] = useFetchData({payload: {"categoryTitle": `${input}`}});

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                Report Category
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
                {data.categories.map((item, i) => {
                    return <Dropdown.Item>{item.categoryTitle}</Dropdown.Item>
                })}
                <div style={{margin: "10px"}}>
                    <input type="text" onChange={handleChange}/>
                    <button style={{backgroundColor: "orange", color: "white"}} onClick={() => {
                        addCategory()
                    }} type="button">+
                    </button>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );

}