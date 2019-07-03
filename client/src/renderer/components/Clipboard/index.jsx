/** @format */

import "./styles.scss";
import { Component, h } from "preact";
import clipboard from "electron-clipboard-extended";

/**
 * Stores and lists contents of system clipboard
 * @extends Component
 */

export default class Clipboard extends Component {
  /**
   * Constructs a new Clipboard component
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = { clipboardStack: [] };
    this.handleTextChanged = this.handleTextChanged.bind(this);
    this.handleImageChanged = this.handleImageChanged.bind(this);
  }

  componentDidMount() {
    clipboard.startWatching();
    clipboard.on("text-changed", this.handleTextChanged);
    clipboard.on("image-changed", this.handleImageChanged);
  }

  componentWillUnmount() {
    clipboard.stopWatching();
    clipboard.off("text-changed");
    clipboard.off("image-changed");v
  }

  /**
   * Reacts to changes in system clipboard
   * @listens {text-changed} listens for text change event
   */
  handleTextChanged() {
    this.setState(prevState => {
      return {
        clipboardStack: [
          ...prevState.clipboardStack,
          new ClipboardItem("txt", clipboard.readText()),
        ],
      };
    });
  }
  /**
   * Reacts to changes in system clipboard
   * @listens {text-changed} listens for text change event
   */
  handleImageChanged() {
    this.setState(prevState => {
      const img = clipboard.readImage();
      const imgURI = img.toDataURL();
      return {
        clipboardStack: [
          ...prevState.clipboardStack,
          new ClipboardItem("img", imgURI),
        ],
      };
    });
  }

  /**
   * Renders component
   * 
   * Returns unordered list, each list item corresponding to some clipboard datum and the button to remove the item
   * @example
   * <ul>
   * ...
   *   <li>
   *   <button>{remove item from list}</button>
   *   <p>{clipboard text}</p>
   *   </li>
   * ...
   * </ul>
   */
  render(props, state) {
    return (
      <ul class="clipboard">
        {state.clipboardStack.map((item, index) => (
          <li class="clipboard__item" id={"cp_it_" + index}>
            <button onclick = {() => state.clipboardStack.splice(index, 1) && this.setState()}>X</button>
            {item.type === "txt" ? (
              <p>{item.data}</p>
            ) : (
              <img src={item.data} alt="image" />
            )}
          </li>
        ))}
      </ul>
    );
  }
}

class ClipboardItem {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }
}