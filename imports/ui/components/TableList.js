import React, {Component} from 'react';
import { Table, Button, Menu, Dropdown, Icon, Divider } from 'antd';
import { Link } from 'react-router-dom';

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
    const { onClick, user, allCourses } = this.props;
    let { sortedInfo, filteredInfo } = this.state;
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
        owner: elem.owner,
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
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          {
            user._id === record.owner ?
            <span>
              <a href="#" className="text--danger" onClick={() => onClick(record.key)}>Supprimer</a>
              <Divider type="vertical" />
            </span>
            :
            ''
          }
          <Link to={`/course/${record.key}`} className="text--primary">Voir le cours</Link>
        </span>
      ),
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
