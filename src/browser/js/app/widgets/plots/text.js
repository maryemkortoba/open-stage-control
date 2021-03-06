var {iconify} = require('../../ui/utils'),
    Widget = require('../common/widget'),
    widgetManager = require('../../managers/widgets')

module.exports = class Text extends Widget {

    static defaults() {

        return {
            type:'text',
            id:'auto',
            linkId:'',

            _geometry:'geometry',

            left:'auto',
            top:'auto',
            width:'auto',
            height:'auto',

            _style:'style',

            label:'auto',
            color:'auto',
            css:'',

            _text: 'text',

            vertical:false,
            wrap:false,
            align:'',

            _value: 'value',
            default: '',
            value: '',

            _osc:'osc',

            preArgs:[],
            address:'auto',
        }

    }

    constructor(options) {

        // backward compat
        if (options.props.widgetId) {
            options.props.value = '@{' + options.props.widgetId + '}'
            delete options.props.widgetId
        }
        super({...options, html: '<div class="text"></div>'})

        if (this.getProp('vertical')) this.widget.classList.add('vertical')
        if (this.getProp('align') === 'left') this.widget.classList.add('left')
        if (this.getProp('align') === 'right') this.widget.classList.add('right')
        if (this.getProp('wrap')) this.widget.classList.add('wrap')

        this.defaultValue = this.getProp('default') || ( this.getProp('label')===false ?
                                this.getProp('id'):
                                this.getProp('label')=='auto'?
                                    this.getProp('id'):
                                    this.getProp('label') )

        this.value = this.defaultValue

        this.setValue(this.value)

    }


    setValue(v, options={}) {

        this.value = v==null ? this.defaultValue : v
        this.widget.innerHTML = iconify(String(this.value).replace(/\n/g,'<br/>'))

        if (options.sync) this.changed(options)

    }

}
