// Firestore CREATE

const onClickHandler = (e) => {
    e.preventDefault();
  
    // Only when 'task' is not empty
    if (task !== "") {
      firestore
        .collection("tasks")
        .add({ todo: task }) // insert task in todo
        .then((res) => { // 
        
          setTasks((prevTasks) => tasks.concat({ todo: task, id: res.id }));
        });
        
      setTask("");
    }
  };
  
  // Firestore READ
  
  const fetchData = useCallback(() => {
    // array to store data
    let saveData = [];
  
    firestore
        .collection("tasks") //  "info" collection
        .get() // 
        .then((docs) => {
        docs.forEach((doc) => {
            saveData.push({ tasks: doc.data().tasks, id: doc.id });
        });
        // add data to task
        setTasks((prevTasks) => prevTasks.concat(saveData));
    });
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Firestore DELETE
  
  const removeHandler = (id) => {
    firestore
      .collection("tasks")
      .doc(id)
      .delete()
      .then(() => 
        setTasks((prevTasks) =>
          prevTasks.filter((prevTask) => id !== prevTask.id)
        )
      );
  };