// Necessary Imports (you will need to use this)
const { Student } = require('./Student')
const fs = require('fs').promises;

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
      // TODO :  new LinkedList instance
    this.head=null;
    this.tail= null;
    this.length=0;
  
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
   // TODO : Adds a Student to the end of the LinkedList with considerations

    const node = new Node(newStudent);
    if (!this.head){ // if head empty

      this.head=node;  // add new node in head and mark tail
      this.tail=node;

    }else{
      this.tail.next=node; //if head is not empty assign new node to tail
      this.tail=node;

    }

    this.length++; // new node added so increase size

  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO : Removes a student by email with considerations
    if(!this.head){                                         //1.Empty linklist
      return null;
    }
   
    if(this.head.data.getEmail() === email){                //2.Checking head has email
      
      this.head=this.head.next;
      if( !this.head){              //checking 2 empty head
        this.tail=null;
      }
      this.length--;
    
      return ;

    }
    let current =this.head;
    while(current.next && current.next.data.getEmail() !== email){ //loop will find emailmatch thr moving next
      current=current.next;
    }
    if(current.next){
     
      current.next=current.next.next;
      if(!current.next){
        this.tail=current;
             }
       this.length--;
      
    }
   
     return ;

  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current =this.head;
    while(current){
     
      if(current.data.getEmail()=== email){ 
        console.log(`Name: ${current.data.getName()},\nYear : ${current.data.getYear()},\nEmail : ${current.data.getEmail()},\nSpecialization : ${current.data.getSpecialization()} `);

        return current.data;
      }
      current=current.next;

    }

    return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO : Empty the student list
    this.head=null;
    this.tail=null;
    this.length=0;
    
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO : join  students with comma ,
    if(!this.head){
      return "";
  
    }
    let current =this.head;
    let students=[];
    while(current){
     students.push(current.data.getName()); //for test:  only pushing student's name
      current=current.next;
    }
        
    return students.join(", "); //should appear as: "JohnDoe, JaneDoe"
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO : sorted array of students by name
    let filterStudentsArray=[];

    filterStudentsArray.sort((a,b) =>{  // sort  alphabetical order all the students 
        if(a.getName()<b.getName()){ return -1;}  // a small than b 
        if(a.getName()>b.getName()){return 1;}
        return 0;    // a=b
      });
      
     // console.log(this.filterStudentsArray);

    return filterStudentsArray;  //return alphabetical order
  }
  sortByName(studentsName){
    return this.#sortStudentsByName(studentsName);

  }
  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    let current =this.head;
    let filterSpecialArray=[];
      
    while(current){
      if(current.data.getSpecialization() === specialization){
        filterSpecialArray.push(current.data);

         }
      current=current.next;

    }
   
     return filterSpecialArray ;
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO

    let current =this.head;
    let filterYearArray=[];
      
    while(current){
      if(current.data.getYear() === minYear){
        filterYearArray.push(current.data);

         }
      current=current.next;

    }
   
     return filterYearArray ;

  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
    if(!fileName){
      console.log("Enter valid FileName");

    }
    const students=[];
    let current =this.head;
    while(current){
      students.push({
        name:current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization:current.data.getSpecialization() }
          );
      current=current.next;

    }
    let existdata =[];
    try{
    const filedata = await fs.readFile(fileName,'utf-8');
    if(filedata){
      existdata = JSON.parse(filedata);
    }
   }catch(err){
    console.log("Error in reading the file");
   }
    const updatefile =[...existdata,...students];
    await fs.writeFile(fileName,JSON.stringify(updatefile, null, 2),(err) => {
    if(err){
      console.log("Error in writing file:" , err);
      return;
    }
    console.log("Student list written succesfully  ");
    });
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    const data= await fs.readFile(fileName,'utf-8');
    try{
    const students =JSON.parse(data);
    this.clearStudents();
    for (const fileStudents of students) {
      this.addStudent(new Student(fileStudents.name, fileStudents.year, fileStudents.email, fileStudents.specialization));
      // dev this.addStudent({ name:fileStudents.name,year: fileStudents.year,email: fileStudents.email, specialization:fileStudents.specialization});
    }
    console.log(this.displayStudents());
    }catch (errormsg) {
      console.log("Error : ", errormsg);

    }
  }

}

module.exports = { LinkedList }
