import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Edit = () => {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const router = useRouter();
  const { title } = router.query;

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let todos = localStorage.getItem("todos");
    if (todos) {
      let todosJson = JSON.parse(todos);
      let currentTodo = todosJson.filter((e) => e.title == title);
      if (currentTodo.length > 0) {
        setTodo(currentTodo[0]);
      }
    }
  }, [router.isReady]);

  const updateTodo = () => {
    let todos = localStorage.getItem("todos");
    if (todos) {
      let todosJson = JSON.parse(todos);
      if (todosJson.find((item) => item.title == title)) {
        let index = todosJson.findIndex((item) => item.title == title);
        todosJson[index].title = todo.title;
        todosJson[index].description = todo.description;
        localStorage.setItem("todos", JSON.stringify(todosJson));
        alert("Todo has been updated");
        setTodo({ title: "", description: "" });
        router.push("/todos");
      } else {
        alert("Todo does not exist");
      }
    } else {
      localStorage.setItem("todos", JSON.stringify([todo]));
    }
  };

  return (
    <div className="my-2 text-3xl">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Update a Todo
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="title"
                className="leading-7 text-lg text-gray-600">
                Todo Title
              </label>
              <input
                type="text"
                value={todo.title}
                onChange={onChange}
                id="title"
                name="title"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="description"
                className="leading-7 text-lg text-gray-600">
                Todo Text
              </label>
              <input
                type="text"
                value={todo.description}
                onChange={onChange}
                id="description"
                name="description"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={updateTodo}
              className="text-white bg-indigo-500 border-0 w-fit py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Update Todo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Edit;
