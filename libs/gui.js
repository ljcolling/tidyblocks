'use strict'

import Blockly from 'blockly/blockly_compressed'

import DataFrame from './dataframe'
import Restore from './persist'
import Env from './env'
import blocks from '../blocks/blocks'

// Load default datasets here rather than inside a function to ensure that
// bundling picks them up.
import COLORS from '../data/colors'
import EARTHQUAKES from '../data/earthquakes'
import PENGUINS from '../data/penguins'
import PHISH from '../data/phish'

/**
 * User interface mediator.
 */
export class UserInterface {
  /**
   * Build user interface object.
   * @param {string} language What language to use for localizing blocks.
   */
  constructor (language) {
    // Initialize blocks support.
    blocks.createBlocks(language)

    // Create storage for datasets loaded by the user. These are stored between
    // program runs.
    this.userData = new Map()
    this._loadDefaultDatasets()

    // Create an empty workspace. Derived classes must fill this in.
    this.workspace = null

    // Create an empty program running environment. (A new environment is
    // created for each run of the program.)
    this.env = null
  }

  /**
   * Get the JSON representation of the workspace contents. If an environment is
   * present, log a count of stacks that were not runnable.
   */
  getJSON () {
    const {code, strayCount} = Blockly.TidyBlocks.workspaceToCode(this.workspace)
    if ((strayCount > 0) && (this.env !== null)) {
      this.env.appendLog('warn', `${strayCount} stray stacks found`)
    }
    const json = JSON.parse(code)
    return json
  }

  /**
   * Run the current program, leaving state in 'this.env'.
   */
  runProgram () {
    this.env = new Env(this) // Before getJSON so that method can log strays.
    const json = this.getJSON()
    const converter = new Restore()
    const program = converter.program(json)
    program.run(this.env)
  }

  /**
   * Load default datasets.
   */
  _loadDefaultDatasets () {
    this.userData.set('colors', new DataFrame(COLORS))
    this.userData.set('earthquakes', new DataFrame(EARTHQUAKES))
    this.userData.set('penguins', new DataFrame(PENGUINS))
    this.userData.set('phish', new DataFrame(PHISH))
  }
}
