### What application is this?

So this application is an application that can be used to manage fish commodity data with several features, namely display data lists, add data, search data, edit data and can also delete data.

### How long did it take for this application to be made?

It takes about 2 days to make this application.

### Where did I get the design reference? 

For the layout, of course, it's very clear I took a reference from the LTE Admin. The reason is because in my opinion, such a design is the most familiar and easily understood by many people. For the styling itself I use Ant Design for headers, tables and buttons. As for the Popup Dialog or also known as Modal, I use standard Bootstrap.

### What are the technologies used to make this application?

This application is made with one of the JavaScript frameworks, namely React JS and is assisted by Redux for state management. For UI Design I use Ant Design and Bootstrap. To communicate with the API, this application uses the Stein Library. And some SCSS that I made to modify an existing view. 

### Is there any issue?

Hmm.. I found difficulties when using Modal and Form components from Ant Design which don't support setState and defaultValue, so I ended up using Modal and Form components from Bootstrap.

### Is there a plan for improvement and development?

Of course, I am very aware that this application is still far from perfect.

- I haven't had time to set up a caching system yet, so I'd like to finish it.
- I want to add validation to the form.
- I also want to fix the error handling in my parse date function, the function sometimes crashes because the date format from the API is incorrect or wrong.
- Improve the application user interface so that users are more comfortable using this application.
- And also with all the data, I think it would be great to make some graphs to make the data more interesting to look at.