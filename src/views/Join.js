import React, { Component } from "react";
import SelectAsync from "react-select/lib/Async";
// import graphQLFetch from "./GraphQLFetch.js";
// import withToast from "./withToast";

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
  }

  onChangeSelection() {
    //   const { history } = this.props;
    //   history.push("/edit/${value}");
  }

  async loadOptions() {
    //   if (term.length < 3) return [];
    //   const query = `query issueList($search: String) {
    //       issueList(search: $search) {
    //       issues {id title}
    //       }
  }

  //   const { showError } = this.props;
  //   const data = await graphQLFetch(query, { search: term }, showError);
  //   return data.issueList.issues.map((issue) => ({
  //     label: `#${issue.id}: ${issue.title}`,
  //     value: issue.id,
  //   }));
  // }

  render() {
    return (
      <AsyncSelect>
        loadOptions = {this.loadOptions}
        filterOption={() => true}
      </AsyncSelect>
    );
  }
}

export default Join;
