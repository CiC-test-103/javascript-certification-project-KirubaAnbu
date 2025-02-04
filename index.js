// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student')
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - filterYear [number] : to filter students by year
      - filterSpecial [Specialization]: to filter students by specialization
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
        console.log('Adding student...')
        const [name, year, email, specialization] = args
        // --------> WRITE YOUR CODE BELOW
         
         let student = new Student( name,year,email,specialization);// add the Student, and display the updated LinkedList
         studentManagementSystem.addStudent(student);
         console.log("Student added  ");
         console.log("Students : ",studentManagementSystem.displayStudents());// display students


        // --------> WRITE YOUR CODE ABOVE
        break;

    case 'remove':
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log('Removing student...')
      // --------> WRITE YOUR CODE BELOW
      
      let [removeEmail]= args;
      studentManagementSystem.removeStudent(removeEmail);
      console.log(` ${removeEmail} Student deatils are  removed`);
      console.log("Currently , Students : ",studentManagementSystem.displayStudents());// display students
            
  
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'display':
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log('Displaying students...')
      // --------> WRITE YOUR CODE BELOW
     
        let displayall =  studentManagementSystem.displayStudents();
        if(displayall){
        console.log(displayall);
        }else {
          console.log("There is no student to display");
        }

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'find':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log('Finding student...')
      // --------> WRITE YOUR CODE BELOW
      let [findEmail] =args;
      let findingStudent = studentManagementSystem.findStudent(findEmail);
      if(findingStudent && findingStudent !== -1){
        
        console.log("Student found . Find the details above . ");
      
      }else if (findingStudent === -1 ){
      
        console.log("Student does not exist" );

      }
      
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'save':
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log('Saving data...')
      // --------> WRITE YOUR CODE BELOW
      
      let [saveFileName] =args;
      studentManagementSystem.saveToJson(saveFileName);
      console.log(`Student data saved in ${saveFileName}`);

      // --------> WRITE YOUR CODE ABOVE
      break;

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log('Loading data...')
      // --------> WRITE YOUR CODE BELOW
        let [loadFileName] =args;
        studentManagementSystem.loadFromJSON(loadFileName);
        console.log(`StudentList loaded from  ${loadFileName} JSON file to LinkedList.`);

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'filterSpecial':

      let [filterSpecialization] =args;
      console.log("Filtering data by Specialization ");
      const filter = studentManagementSystem.filterBySpecialization(filterSpecialization);
      console.log(filter.map((students) => students.getString()));
      
      break;

    case 'filterYear':
      
      let [filterYear] =args;
      console.log("Filtering data by Age or Year ");
      const filterbyYear = studentManagementSystem.filterByMinYear(parseInt(filterYear));
      console.log(filterbyYear.map((students) => students.getString())); //students.getName() for name to display
      
      break;

    case 'clear':
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log('Clearing data...')
      // --------> WRITE YOUR CODE BELOW
      
      studentManagementSystem.clearStudents();
      console.log("Student details are cleared ");

      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'q':
        console.log('Exiting...');
        rl.close();
        break;

    default:
        console.log('Unknown command. Type "help" for a list of commands.');
        break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
      await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
