import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import {
  fetchPartEvents,
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelectEvent
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchPartEvents()
  }

  isRowLoaded = () => {}

  loadMoreRows = ({ startIndex, stopIndex }) => {
    console.log('startIndex', startIndex)
    console.log('stopIndex', stopIndex)
    alert(1)
    this.props.fetchPartEvents()
  }

  rowGetter = ({ index }) => this.props.events[index]

  render() {
    if (this.props.loading) return <Loader />
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={
          this.props.loaded
            ? this.props.events.length
            : this.props.events.length + 1
        }
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            rowCount={this.props.events.length}
            width={500}
            height={300}
            rowHeight={50}
            headerHeight={50}
            rowGetter={this.rowGetter}
            onRowClick={this.props.selectEvent}
          >
            <Column dataKey="title" width={200} label="Title" />
            <Column dataKey="where" width={200} label="Place" />
            <Column dataKey="when" width={200} label="When" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchPartEvents, selectEvent: toggleSelectEvent }
)(EventsTableVirtualized)
