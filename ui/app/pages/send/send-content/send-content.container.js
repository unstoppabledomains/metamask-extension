import { connect } from 'react-redux'
import SendContent from './send-content.component'
import {
  accountsWithSendEtherInfoSelector,
  getAddressBook,
  getSendTo,
} from '../send.selectors'
import actions from '../../../store/actions'

function mapStateToProps (state) {
  return {
    to: getSendTo(state),
    addressBook: getAddressBook(state),
    ownedAccounts: accountsWithSendEtherInfoSelector(state),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    showAddToAddressBookModal: (recipient) => dispatch(actions.showModal({
      name: 'ADD_TO_ADDRESSBOOK',
      recipient,
    })),
  }
}

function mergeProps (stateProps, dispatchProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    showAddToAddressBookModal: () => dispatchProps.showAddToAddressBookModal(stateProps.to),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SendContent)
