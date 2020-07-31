import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";
import graphQLFetch from "../GraphQLFetch.js";
import { Table, Button } from "reactstrap";
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
      <div className="content">
        <h4>Search your Queue-tacular ID:</h4>
        <AsyncSelect>
          loadOptions = {this.loadOptions}
          filterOption={() => true}
        </AsyncSelect>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Queue Name</th>
              <th>Currently Queued</th>
              <th>Estimated Wait time(min)</th>
              <th>Am I in this Queue??</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark's Haircutting services</td>
              <td>4</td>
              <td>45</td>
              <td>
                <Button>Join</Button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Otto dentistry</td>
              <td>3</td>
              <td>90</td>
              <td>
                <Button>Join</Button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry's Shared Washing machine</td>
              <td>3</td>
              <td>35</td>
              <td>Already Queued!</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Join;
