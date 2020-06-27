import React from "react"
import useAuth from "../hooks/useAuth"
import {DayPickHook} from '../Components/DayPickHook'

const Dashboard = () => {
  useAuth()
  return (
    <div><DayPickHook /></div>
  )
}

export default Dashboard
