import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const Converter = () => {

  const listOfCurrencies = [
    { id: 1, symbol: 'USD', currencyName: 'United States Dollar' },
    { id: 2, symbol: 'EUR', currencyName: 'Euro' },
    { id: 3, symbol: 'GBP', currencyName: 'Pound Sterling' },
    { id: 4, symbol: 'CAD', currencyName: 'Canadian Dollar' },
    { id: 5, symbol: 'AUD', currencyName: 'Australian Dollar' },
    { id: 6, symbol: 'JPY', currencyName: 'Japenese Yen' },
    { id: 7, symbol: 'KRW', currencyName: 'South Korean Won' },
    { id: 8, symbol: 'RUB', currencyName: 'Russian Ruble' },
    { id: 9, symbol: 'CHF', currencyName: 'Swiss Franc' },
    { id: 10, symbol: 'BRL', currencyName: 'Brazilian Real' },
    { id: 11, symbol: 'HKD', currencyName: 'Hong Kong Dollar' },
    { id: 12, symbol: 'TWD', currencyName: 'New Taiwan Dollar' },
    { id: 13, symbol: 'SGD', currencyName: 'Singapore Dollar' }
  ]

  const [currentExchange, setCurrentExchange] = useState('00000.00')
  const [currentCurrency, setCurrentCurrency] = useState('USD')

  useEffect(() => {
    const setData = async () => {
      const response = await axios.get('https://blockchain.info/ticker')
      const BTCValue = response.data.USD.last
      const moneyFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(BTCValue)
      setCurrentExchange(moneyFormat)
      setCurrentCurrency('USD')
    }
    setData()
  }, [])

  const changeOutput = useCallback(async () => {
    const response = await axios.get('https://blockchain.info/ticker')
    const BTCValue = response.data[`${currentCurrency}`].last
    const inputField = document.querySelector('.from-content')
    if (inputField.value <= 0) {
      setCurrentExchange('-')
    } else {
      const output = BTCValue * inputField.value
      const moneyFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(output)
      setCurrentExchange(moneyFormat)
    }
  }, [currentCurrency])

  const changeReversedOutput = useCallback(async () => {
    const response = await axios.get('https://blockchain.info/ticker')
    const BTCValue = response.data[`${currentCurrency}`].last
    const inputField = document.querySelector('.from-content')
    if (inputField.value <= 0) {
      setCurrentExchange('-')
    } else {
      const output = inputField.value / BTCValue
      const moneyFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 6 }).format(output)
      setCurrentExchange(moneyFormat)
    }
  }, [currentCurrency])

  useEffect(() => {
    const container = document.querySelector('.converter-container')
    if (container.classList.contains('reversed')) {
      changeReversedOutput()
    } else {
      changeOutput()
    }
  }, [currentCurrency, changeOutput, changeReversedOutput])

  return (
    <div className="converter-container">

      <div className="from">
        <input type="number" name="from" id="from" className='from-content' defaultValue='1' onChange={() => {
          const container = document.querySelector('.converter-container')
          if (container.classList.contains('reversed')) {
            changeReversedOutput()
          }
          else {
            changeOutput()
          }
        }} />
      </div>

      <div className="currency-container-1">
        <span className='currency-container-1-content'>Bitcoin (BTC)</span>
      </div>

      <div className="swap-button">
        <button className='swap-button-content' onClick={() => {
          const container = document.querySelector('.converter-container')
          container.classList.toggle('reversed')
          const currency = document.querySelector('.dropdown-menu').value
          setCurrentCurrency(currency)
          if (container.classList.contains('reversed')) {
            changeReversedOutput()
          } else {
            changeOutput()
          }
        }}><i className="fas fa-exchange-alt"></i></button>
      </div>

      <div className="output">
        <span className='output-content'>{currentExchange}</span>
      </div>

      <div className="currency-container-2">
        <span className='currency-container-2-content'>
          <select className='dropdown-menu' onChange={(e) => {
            const currency = e.target.value
            setCurrentCurrency(currency)
          }}>
            {listOfCurrencies.map((option) => (
              <option key={option.id} value={option.symbol}>{option.currencyName} ({option.symbol})</option>
            ))}
          </select>
        </span>
      </div>

    </div >
  )
}
export default Converter