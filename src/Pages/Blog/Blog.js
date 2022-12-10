import React from 'react';

const Blog = () => {
    return (
        <div className="container mx-auto">
            <div className="card bg-base-100 shadow-xl my-2">
                <div className="card-body">
                    <h2 className="card-title">What are the different ways to manage a state in a React application?</h2>
                    <p>The Four Kinds of React State to Manage</p>
                    <ul>
                        <li>Local state.</li>
                        <li>Global state.</li>
                        <li>Server state.</li>
                        <li>URL state.</li>

                    </ul>
                    <p>React's useState is the best option for local state management. If you need a global state solution, the most popular ones are Redux, MobX, and the built-in Context API. Your choice will depend on the size of your project</p>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl my-2">
                <div className="card-body">
                    <h2 className="card-title">How does prototypical inheritance work?</h2>
                    <p>Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object.</p>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl my-2">
                <div className="card-body">
                    <h2 className="card-title">What is a unit test? Why should we write unit tests?</h2>
                    <p>Main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl my-2">
                <div className="card-body">
                    <h2 className="card-title">React vs. Angular vs. Vue?</h2>
                    <p className='text-xl font-bold my-1'>React</p>
                    <p>React is based on JavaScript, but it's mostly combined with JSX (JavaScript XML), a syntax extension that allows you to create elements that contain HTML and JavaScript at the same time. </p>
                    <p className='text-xl font-bold my-1'>Vue</p>
                    <p>Vue's templating syntax lets you create View components, and it combines familiar HTML with special directives and features. This templating syntax is preferred, even though raw JavaScript and JSX are also supported.</p>

                    <p className='text-xl font-bold my-1'>Angular</p>
                    <p>Angular is built in TypeScript, so its use is recommended to get the most seamless experience, but plain JavaScript is also supported.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;