import * as React from 'react'
import {
  Dimensions,
  FlatList,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface RowItemProps {
  onPressItem(id: string | number): void
  title: string
  id: string | number
}

interface ButtonFrame {
  x: number
  y: number
  w: number
  h: number
}

interface FlatListData {
  title: string
  id: string | number
}

export interface DropdownProps {
  rowData: string[]
  onRowPress?(id: number | string): void
  closeAfterRowPress?: boolean
}

interface DropdownStates {
  showDropdown: boolean
  listData: FlatListData[]
}

class RowItem extends React.PureComponent<RowItemProps, {}> {
  private _onPress = () => {
    const { onPressItem, id } = this.props
    onPressItem(id)
  }

  render() {
    const { title } = this.props

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.rowText}>
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class HamburgerButton extends React.Component<{ buttonRef: React.RefObject<TouchableOpacity>, onButtonPress?(): void },{}> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onButtonPress} ref={this.props.buttonRef}>
      <View style={styles.iconWrapper}>
        <Icon name="more-vert" size={24} color="#757575" />
      </View>
    </TouchableOpacity>
    )
  }
}

export default class Dropdown extends React.Component<DropdownProps, DropdownStates> {
  static defaultProps = {
    closeAfterRowPress: true
  }

  buttonRef: React.RefObject<TouchableOpacity> = React.createRef()
  buttonFrame: ButtonFrame

  constructor(props) {
    super(props)

    // dataSource for list
    const { rowData } = this.props
    const data = rowData.map(i => ({
      title: i,
      id: i
    }))
    this.state = {
      showDropdown: false,
      listData: data
    }
  }

  render() {
    return (
      <View>
        <HamburgerButton onButtonPress={this.onButtonPress} buttonRef={this.buttonRef} />
        {this.renderModal()}
      </View>
    )
  }

  updatePosition = callback => {
    this.buttonRef.current.measure((_x, _y, width, height, pageX, pageY) => {
      // console.log('_x, _y, width, height, pageX, pageY', _x, _y, width, height, pageX, pageY)
      this.buttonFrame = {
        x: pageX,
        y: pageY,
        w: width,
        h: height
      }
      callback && callback()
    })
  }

  show = () => {
    this.updatePosition(() => {
      this.setState({ showDropdown: true })
    })
  }

  hide = () => {
    this.updatePosition(() => {
      this.setState({ showDropdown: false })
    })
  }

  select = (id: number | string) => {
    this.props.closeAfterRowPress && this.hide()
    this.props.onRowPress(id)
  }

  onButtonPress = () => {
    this.show()
  }

  onModalRequestClose = () => {
    this.hide()
  }

  onModalPress = () => {
    this.hide()
  }

  calcPosition = (): StyleProp<ViewStyle> => {
    const dimensions = Dimensions.get('window')
    const windowWidth = dimensions.width

    const positionStyle: StyleProp<ViewStyle> = {
      top: Math.max(8, this.buttonFrame.y),
      right: Math.max(8, windowWidth - this.buttonFrame.x - this.buttonFrame.w)
    }

    // console.log(`top: ${positionStyle.top}, right: ${positionStyle.right}`)
    return positionStyle
  }

  renderRow = ({ item }) => {
    return <RowItem id={item.id} title={item.title} onPressItem={this.select} />
  }

  keyExtractor = (item, _index) => item.id

  renderDropdown = () => (
    <FlatList data={this.state.listData} renderItem={this.renderRow} keyExtractor={this.keyExtractor} />
  )

  renderModal = () => {
    if(!this.state.showDropdown) {
      return null
    }

    const frameStyle = this.calcPosition()

    return (
      <Modal
        animationType="fade"
        visible
        transparent
        onRequestClose={this.onModalRequestClose}
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
      >
        <TouchableWithoutFeedback onPress={this.onModalPress}>
          <View style={styles.modal}>
            <View style={[styles.dropdown, frameStyle]}>{this.renderDropdown()}</View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 8
  },
  modal: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 4,
    padding: 8
  },
  rowText: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 12,
    backgroundColor: 'white',
    alignSelf: 'flex-start'
  }
})
