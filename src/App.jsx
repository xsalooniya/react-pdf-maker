/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 0,
    padding: 10,
  }
});

// Create Document Component

function Input({ label, placeholder, type="text", value, onChange }) {
  return (
    <div className='input-box'>
      <label htmlFor="xx">{label}</label>
      <input id={label} type={type} placeholder={placeholder} value={value} onChange={onChange}></input>
    </div>
  )
}

function ListAdder()
{
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemDate, setItemDate] = useState("");

  const [items, setItems] = useState([]);

  function handleAdd() {
      const newItem = {
        itemName, itemQuantity, itemDate
      };
      console.log(newItem);
      setItems([...items, newItem]);
  }

  const ItemsList = items.map((it, x) => (
    <div key={x} className='item'>
      <h3>ITEM #{x+1}</h3>
      <p>Name: {it.itemName}</p>
      <p>Quantity: {it.itemQuantity}</p>
      <p>Date: {it.itemDate}</p>
    </div>
  ));

  const ItemsListPDF = items.map((it, x) => (
    <View key={x} style={styles.section}>
      <Text>ITEM #{x+1}</Text>
      <Text>Name: {it.itemName}</Text>
      <Text>Quantity: {it.itemQuantity}</Text>
      <Text>Date: {it.itemDate}</Text>
    </View>
  ));

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>NAME: {userName}</Text>
          <Text>ADRESS: {userAddress}</Text>
        </View>
        {ItemsListPDF}
      </Page>
    </Document>
  );

  return (
    <>
    <Input label="Name" placeholder="John Smith" value={userName} onChange={(e) => setUserName(e.target.value)} />
    <Input label="Address" placeholder="44-B, Avenue Downtown, New York" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
      <div className='items'>
        {ItemsList}
      </div>
      <div className='list-adder'>
        <h2 style={{textAlign: 'center'}}>ITEM</h2>
        <Input label="Item-Name" placeholder="Monitors" value={itemName} onChange={(e) => setItemName(e.target.value)}/> 
        <Input label="Item-Quantity" placeholder="24" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)}/> 
        <Input label="Item-Date" type='date' value={itemDate} onChange={(e) => setItemDate(e.target.value)}/> 
        <button onClick={handleAdd}>ADD</button>
        <div className='download'>
        <PDFDownloadLink document={<MyDocument />} fileName="items-report.pdf">
            {({ loading }) =>
              loading ? 'Loading document...' : 'GENERATE PDF!'
            }
        </PDFDownloadLink>
      </div>
      </div>
    </>
  )
}

function App() {

  return (
    <>
      <ListAdder />
      
    </>
  )
}

export default App
