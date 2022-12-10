import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import BasicButton from '../../../Components/BasicButton';
import { userContext } from '../../../Contexts/AuthContext';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const { user } = useContext(userContext)
    const navigate = useNavigate();

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`)
            const data = await res.json();
            return data;
        }
    });

    const handleAddProduct = event => {
        event.preventDefault();
        const form = event.target;
        const productname = form.productname.value;
        const categoryid = form.categoryid.value;
        const location = form.location.value;
        const condition = form.condition.value;
        const description = form.description.value;
        const resaleprice = form.resaleprice.value;
        const originalprice = form.originalprice.value;
        const kilometers = form.kilometers.value;
        const yearsused = form.yearsused.value;
        const purchaseyear = form.purchaseyear.value;
        const status = 'available';
        const model = form.model.value;
        const selleremail = user.email;

        // Image Upload
        const image = event.target.image.files[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB}`

        fetch(url, {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
        .then(imageData => {

            const product = {
                productname,
                condition,
                categoryid,
                location,
                resaleprice,
                originalprice,
                selleremail,
                description,
                kilometers,
                model,
                yearsused,
                purchaseyear,
                status,
                image: imageData.data.display_url,
            }
            saveProduct(product)
        })

    }


    const saveProduct = (product) => {

        fetch(`${process.env.REACT_APP_API_URL}/addproducts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast('Product Created Successfully!!!')
                navigate('/dashboard/myproducts');
            })
    }


    return (
        <div className='py-3'>
            <h1 className='text-3xl text-primary font-bold'>Post Your Add Now</h1>
            <form onSubmit={handleAddProduct}>
                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">What is Product name?</span>
                    </label>
                    <input type="text" name='productname' placeholder="Product Name" className="input input-bordered w-full mt-1" />
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Product Category</span>
                    </label>
                    <select name="categoryid" className="select select-bordered w-full">
                        {
                            categories.map(category => <option key={category._id} value={category._id}>{category.category}</option>)
                        }
                    </select>
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Location?</span>
                    </label>
                    <select name="location" className="select select-bordered w-full">
                        <option value="dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                    </select>
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Condition type?</span>
                    </label>
                    <select name="condition" className="select select-bordered w-full">
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                    </select>
                </div>


                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Product Picture</span>
                    </label>
                    <input type="file" accept='image/*' name="image" className="input input-bordered w-full mt-1" />
                </div> 

                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Resale Price?</span>
                    </label>
                    <input type="text" name='resaleprice' placeholder="Resale Price" className="input input-bordered w-full mt-1" />
                </div>
                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Original Price?</span>
                    </label>
                    <input type="text" name='originalprice' placeholder="Original Price" className="input input-bordered w-full mt-1" />
                </div>
                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Years of use?</span>
                    </label>
                    <input type="text" name='used' placeholder="Years of use" className="input input-bordered w-full mt-1" />
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea name="description" className="textarea textarea-accent" placeholder="Description"></textarea>
                </div>


                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">kilometers used</span>
                    </label>
                    <input type="text" name='kilometers' placeholder="kilometers used" className="input input-bordered w-full mt-1" />
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Model</span>
                    </label>
                    <input type="text" name='model' placeholder="Model" className="input input-bordered w-full mt-1" />
                </div>


                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Year Used</span>
                    </label>
                    <input type="text" name='yearsused' placeholder="Year Used" className="input input-bordered w-full mt-1" />
                </div>

                <div className="form-control w-full mt-1">
                    <label className="label">
                        <span className="label-text">Purcahse Year</span>
                    </label>
                    <input type="text" name='purchaseyear' placeholder="Purcahse Year" className="input input-bordered w-full mt-1" />
                </div>

                <div className='my-1'>
                    <BasicButton>Post Your Add</BasicButton>
                </div>

            </form>

        </div>
    );
};

export default CreatePost;