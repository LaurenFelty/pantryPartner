import React, { useState } from 'react';
import './styles/AddItemsContainer.scss';

// Define a form input to reuse
const FormInput = ({ label, id, name, type, value, onChange, placeholder }) => (
  <div className='entryElement'>
    <label htmlFor={id}>{label}:</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

// Define a select form layout
const FormSelect = ({ label, id, name, value, onChange, options }) => (
  <div className='entryElement'>
    <label htmlFor={id}>{label}:</label>
    <select id={id} name={name} value={value} onChange={onChange}>
      <option value='' disabled>
        Select {label.toLowerCase()}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const AddItemsContainer = () => {
  // Handle state change
  const [form, setForm] = useState({
    item: '',
    actionType: '',
    itemType: '',
    qty: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);

    try {
      const response = await fetch('http://localhost:8080/newItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);

        // Handle success
        setForm({
          item: '',
          actionType: '',
          itemType: '',
          qty: '',
        });
      } else {
        console.error('Error:', response.statusText);
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error (e.g., show error message)
    }
  };

  const actionOptions = [
    { value: 'add', label: 'Add' },
    { value: 'delete', label: 'Delete' },
  ];

  const itemTypeOptions = [
    { value: 'recipe', label: 'Recipe' },
    { value: 'dairyAndEggs', label: 'Dairy & Eggs' },
    { value: 'produce', label: 'Produce' },
    { value: 'bread', label: 'Bread & Baked Items' },
    { value: 'spices', label: 'Spices' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'meat', label: 'Meat & Seafood' },
    { value: 'frozen', label: 'Frozen' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'catTreats', label: 'Cat Treats' },
    { value: 'others', label: 'Others' },
  ];

  return (
    <div id='addItemsContainer'>
      <h1>Change Your Inventory:</h1>
      <form id='changeForm' onSubmit={handleSubmit}>
        <FormSelect
          label='Action'
          id='actionType'
          name='actionType'
          value={form.actionType}
          onChange={handleChange}
          options={actionOptions}
        />
        <FormSelect
          label='Type'
          id='itemType'
          name='itemType'
          value={form.itemType}
          onChange={handleChange}
          options={itemTypeOptions}
        />
        <FormInput
          label='Item'
          id='item'
          name='item'
          type='text'
          value={form.item}
          onChange={handleChange}
          placeholder='Enter items:'
        />
        <FormInput
          label='Quantity'
          id='qty'
          name='qty'
          type='number'
          value={form.qty}
          onChange={handleChange}
          placeholder='Enter quantity:'
        />
        <div id='buttonContainer'>
          <button id='submitButton' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemsContainer;
