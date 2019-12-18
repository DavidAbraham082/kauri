/** @format */

import "./modern-normalize.css";
import "./styles.scss";
import { h, Component } from "preact";
import { configureMenu } from "helpers/menu";

import Editor from "components/Editor";
import Clipboard from "components/Clipboard";

/**
 * Root application component.
 */
export default class Application extends Component {
  componentDidMount = () => configureMenu();

  render = () => (
    <div class="app">
      <Clipboard />
      <Editor />
    </div>
  );
}
