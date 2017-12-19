import React, {Component} from 'react';
import { Table, Button } from 'antd';

class TableList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      filteredInfo: null,
      sortedInfo: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.setUsernameSort = this.setUsernameSort.bind(this);
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  clearFilters = () => {
    this.setState({
      filteredInfo: null
    });
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  setUsernameSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'ownerUsername',
      },
    });
  }

  render () {
    let { sortedInfo, filteredInfo } = this.state;
    let { allCourses } = this.props;
    let courses = [];
    let filtersUsername = allCourses.map((elem) => {
      let filterElem = {
        text: elem.ownerUsername,
        value: elem.ownerUsername
      }

      return filterElem
    })
    .filter((el) => {
      if (!courses.includes(el.text)) {
        courses.push(el.text);

        return true
      }
    })

    const dataCourses = allCourses.map((elem, index) => {
      return {
        key: elem._id,
        ownerUsername: elem.ownerUsername,
        title: elem.title,
        description: elem.description,
      }
    })

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [{
      title: 'Username',
      dataIndex: 'ownerUsername',
      key: 'ownerUsername',
      filters: filtersUsername,
      filteredValue: filteredInfo.ownerUsername || null,
      onFilter: (value, record) => record.ownerUsername.includes(value),
      sorter: (a, b) => a.ownerUsername.length - b.ownerUsername.length,
      sortOrder: sortedInfo.columnKey === 'ownerUsername' && sortedInfo.order,
    }, {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }];

    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.setUsernameSort}>Sort Username</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={dataCourses} onChange={this.handleChange} />
      </div>
    );
  }
}

export default TableList;
