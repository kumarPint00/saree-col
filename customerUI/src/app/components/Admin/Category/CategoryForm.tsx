import React, { FC } from 'react';
import { TextField } from '@mui/material';



interface Category {
    name: string;
    categoryId: string;
    key: string;
    version: string;
}

interface CategoryProps {
    category: Category;
    onSave: (category: any) => void;
}
const CategoryForm: FC<CategoryProps> = ({ category, onSave }) => {
 const [name, setName] = React.useState(category ? category.name : '');
 const [categoryId, setCategoryId] = React.useState(category ? category.categoryId : '');
 const [key, setKey] = React.useState(category ? category.key : '');
 const [version, setVersion] = React.useState(category ? category.version : 1);

 const handleSave = () => {
    onSave({ name, categoryId, key, version });
 };

 return (
    <form onSubmit={handleSave}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      />
      <TextField
        label="Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        required
      />
      <TextField
        label="Version"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        required
        type="number"
      />
      <button type="submit">Save</button>
    </form>
 );
};

export default CategoryForm;
