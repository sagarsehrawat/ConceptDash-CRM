import axios from 'axios';
import { React, useEffect, useState } from 'react'
import { GET_EMPLOYEENAMES, GET_EXPENSE_CATEGORIES, GET_EXPENSE_TRANSACTIONS, HOST } from '../Constants/Constants';

const ExpenseUpdate = () => {
    const [expenseTransactions, setexpenseTransactions] = useState([])
    const [categories, setcategories] = useState([])
    const [employees, setemployees] = useState([])
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        setisLoading(true)
        const call = async () => {
            await axios.get(HOST + GET_EXPENSE_TRANSACTIONS,
                { headers: { 'auth': 'Rose ' + localStorage.getItem('auth') } }
            ).then((res) => {
                setexpenseTransactions(res.data.res)
            }).catch((err) => {
                console.log(err);
            });
            await axios.get(HOST + GET_EXPENSE_CATEGORIES,
                { headers: { 'auth': 'Rose ' + localStorage.getItem('auth') } }
            ).then((res) => {
                setcategories(res.data.res)
            }).catch((err) => {
                console.log(err);
            });
            await axios.get(HOST + GET_EMPLOYEENAMES,
                { headers: { 'auth': 'Rose ' + localStorage.getItem('auth') } }
            ).then((res) => {
                setemployees(res.data.res)
            }).catch((err) => {
                console.log(err);
            });
        }
        call()
    }, []);
    return (
        <>
        </>
    )
}

export default ExpenseUpdate