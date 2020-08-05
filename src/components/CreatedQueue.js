import React from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Progress,
  Badge,
  Button,
  Table,
  Tooltip,
} from 'reactstrap';

import graphQLFetch from '../GraphQLFetch';
import TooltipExampleMulti from './ToolTipExampleMulti';
import ExpandableTable from './ExpandableTable';

class CreatedQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: `No created queues! Click "CREATE" to get started.`,
      description: '',
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    // this.loadData();
  }

  async loadData() {
    const queryForItems = `query {
      itemMany(filter:{
          status: Waiting,
          user: "${this.props.userId}",
      }) {
       _id
      }
    }`;

    const queryForQueue = `query {
      queueOne(filter:{
        status: Open,
        items:[{
          user: "${this.props.userId}",
          status: Waiting
        }]
      }) {
        title
      }
    }`;

    const data = await graphQLFetch(queryForItems);
    if (data.itemMany.length > 0) {
      const queueData = await graphQLFetch(queryForQueue);
      this.setState({
        title: queueData.queueOne.title,
        description: queueData.queueOne.description,
      });
    }
  }

  render() {
    // const data = this.loadData();
    // console.log(data);
    return (
      <Card>
        <CardBody>
          <Table style={{ marginBottom: 0 }} size='sm' borderless>
            <tbody>
              <tr>
                <CardHeader tag='h5' style={{ verticalAlign: 'top' }}>
                  {this.state.title}
                </CardHeader>
                <td style={{ textAlign: 'right' }}>
                  <Button>
                    <i
                      style={{ marginRight: 10 }}
                      className='nc-icon nc-settings-gear-65'
                    />
                    Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <hr />
          <Table style={{ marginBottom: 0 }} size='sm' borderless responsive>
            <tbody>
              <tr>
                <td>
                  <b>5</b> participants currently waiting.
                </td>
              </tr>
              <tr>
                <td>
                  Queue is capped at <b>15</b> participants.
                </td>
              </tr>
              <tr>
                <td>
                  <TooltipExampleMulti />
                </td>
              </tr>
              <tr>
                <td>
                  Estimated end of queue current wait time is <b>15</b> minutes.
                </td>
              </tr>
              <td>
                <Badge color='success'>
                  <h5 style={{ marginLeft: 10, marginBottom: 0 }}>
                    Active.
                    <i
                      style={{ marginRight: 10 }}
                      className='nc-icon nc-bulb-63'
                    />
                  </h5>
                </Badge>
              </td>
            </tbody>
          </Table>
          <hr style={{ marginBottom: 0, marginTop: 0 }} />
        </CardBody>
        <CardFooter>
          <div>
            <ExpandableTable />
          </div>
          <div style={{ textAlign: 'right' }}>
            <i className='fa fa-history' /> Updated 3 mins ago
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default CreatedQueue;
