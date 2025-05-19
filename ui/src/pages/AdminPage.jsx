import React, { useState } from 'react'

import {  BarChart,  PlusCircle, ShoppingBasket } from 'lucide-react'
import CreateProductForm from '../component/CreateProductForm'
import ProductsList from '../component/ProductsList'
import AnalyticsTab from '../component/AnalyticsTab'
import { motion } from 'framer-motion'
import "../pages.CssFile/AdminPage.css"


const tabs = [
    {id : "create"  , label : "create" , icon : PlusCircle },
    {id : "products"  , label : "product" , icon : ShoppingBasket },
    {id : "analytics"  , label : "analytics" , icon : BarChart }
]

const AdminPage = () => {
    const [activeTab , setActiveTab] = useState()
return (
	<div className='admin-page'>
		<div className='admin-container'>
			<motion.h1
				className='admin-title'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				Admin Dashboard
			</motion.h1>
			<div className='admin-tabs'>
				{tabs.map((tab) => (
                    <button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`admin-tab-btn ${activeTab === tab.id ? "active" : ""}`}
					>
						<tab.icon className='mr-2 h-5 w-5' />
						{tab.label}
					</button>
				))}
			</div>

			{activeTab === "create" && <CreateProductForm />}
			{activeTab === "products" && <ProductsList />}
			{activeTab === "analytics" && <AnalyticsTab />}
		</div>
	</div>
);

}

export default AdminPage