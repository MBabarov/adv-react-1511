import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import { selectedEventsSelector, toggleSelectEvent } from '../../ducks/events'
import 'react-virtualized/styles.css'

export class SelectedEventsVirtualized extends Component {
  static propTypes = {}

  rowGetter = ({ index }) => this.props.events[index]

  render() {
    return (
      <Table
        rowCount={this.props.events.length}
        width={500}
        height={300}
        rowHeight={50}
        headerHeight={50}
        rowGetter={this.rowGetter}
      >
        <Column dataKey="title" width={200} label="Title" />
        <Column dataKey="where" width={200} label="Place" />
        <Column dataKey="when" width={200} label="When" />
      </Table>
    )
  }
}

export default connect(
  (state) => ({
    events: selectedEventsSelector(state)
  }),
  { selectEvent: toggleSelectEvent }
)(SelectedEventsVirtualized)
