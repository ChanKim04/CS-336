/*  Homework03
 *  
 * created Fall 2018 (11/15) 
 * @author: Chan Kim (ck45) for CS 336 at Calvin College  
 */

var PersonBox = React.createClass({
    loadPeopleFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    handlePersonSubmit: function(person) {
      // TODO: submit to the server and refresh the list
      var people = this.state.data;
      // Optimistically set an id on the new person. It will be replaced by an
      // id generated by the server. In a production application you would likely
      // not use Date.now() for this and would have a more robust system in place.
      person.id = Date.now();
      var newPeople = people.concat([person]);
      this.setState({data: newPeople});
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: person,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({data: people});
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadPeopleFromServer();
      setInterval(this.loadPeopleFromServer, this.props.pollInterval);
    },
    render: function() {
      return (
        <div className="personBox">
          <h1>People</h1>
          <PersonList data={this.state.data} />
          <PersonForm onPersonSubmit={this.handlePersonSubmit} />
        </div>
      );
    }
  });
  
  var PersonList = React.createClass({
    render: function() {
      var personNodes = this.props.data.map(function(person) {
        return (
          <Person name={person.firstName + " " + person.lastName} key={person.loginID}>
            {"Login ID: " + person.loginID}
            {"\tStart Date: " + person.startDate}
          </Person>
        );
      });
      return (
        <div className="personList">
          {personNodes}
        </div>
      );
    }
  });
  
  var PersonForm = React.createClass({
    getInitialState: function() {
      return {firstName: '', lastName: '', loginID: '', startDate: ''};
    },
    handleFirstNameChange: function(e) {
      this.setState({firstName: e.target.value});
    },
    handleLastNameChange: function(e) {
      this.setState({lastName: e.target.value});
    },
    handleLoginIdChange: function(e) {
        this.setState({loginID: e.target.value});
    },
    handleStartDateChange: function(e) {
        this.setState({startDate: e.target.value});
    },
    handleSubmit: function(e) {
      e.preventDefault();
      var firstName = this.state.firstName.trim();
      var lastName = this.state.lastName.trim();
      var loginID = this.state.loginID.trim();
      var startDate = this.state.startDate.trim();
      if (!firstName || !lastName || !loginID || !startDate) {
        return;
      }
      // TODO: send request to the server    
      this.props.onPersonSubmit({firstName: firstName, lastName: lastName, loginID: loginID, startDate: startDate});
      this.setState({firstName: '', lastName: '', loginID: '', startDate: ''});
    },
    render: function() {
      return (
        <form className="personForm" onSubmit={this.handleSubmit}>
            <input className="ui-widget" type="text" placeholder="Last name" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
            <input className="ui-widget" type="text" placeholder="First name" value={this.state.lastName} onChange={this.handleLastNameChange}/>
            <input className="ui-widget" type="text" placeholder="Login ID" value={this.state.loginID} onChange={this.handleLoginIdChange}/>
            <input className="ui-widget" type="text" placeholder="Start date" value={this.state.startDate} onChange={this.handleStartDateChange}/>
            <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post"/>
        </form>        
      );
    }
  });
  
  var Person = React.createClass({
    rawMarkup: function() {
      var md = new Remarkable();
      var rawMarkup = md.render(this.props.children.toString());
      return { __html: rawMarkup };
    },
  
    render: function() {
      return (
        <div className="person">
          <h2 className="personName">
            {this.props.name}
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      );
    }
  });
  
  ReactDOM.render(
    <PersonBox url="/api/people" pollInterval={2000} />,
    document.getElementById('content')
  );