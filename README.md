# jquery-speakable
Easily make HTML elements speakable with this jQuery plugin.

Sometimes you need to make your HTML talk. Maybe this is for Accesibility Best Practices, maybe it's just for fun. Whatever your reasons may be `jquery.speakable.js` is ready to help you spill the beans.

### Dependencies
`jquery.speakable.js` requires:
 - `jQuery`
 - `window.speechSynthesis` support
 
### Usage
```html
<h1 class="speakable">Hello World</h1>
<h2 class="speakable"><span data-enunciate="You Only Live Once">YOLO</span></h2>
<h2 class="speakable" data-transcript="fred-story" data-voice="Fred">Want to hear a story?</h2>
  <p id="fred-story">This is a story by <strike muted>Frank </strike>Fred.</p>
<script>
$('.speakable').each(function(){
  $(this).speakable().click(function(){
    $(this).data('plugin_speakable').speak();
  });
});
</script>
```

`speakable.jquery.js` simple gives your jQuery Objects the ability to speak. This is done by first calling `.speakable()` on your elements; then using the `data('plugin_speakable').speak()` method when it is time to talk.

### Settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
`voice` | `String` | `"Vicki"` | Voice to be used by [`speechSynthesis` api](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#speechsynthesisvoice). See [demo](http://codepen.io/matt-west/full/wGzuJ).
`lang` | `String` | `"en-US"` | Language to be used by [`speechSynthesis` api](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#utterance-attributes).
`transcript` | `String` | null | ID of Element to be read aloud, or a `String` to read aloud.
`tidyTranscript` | `Boolean` | `true` | Whether or not to tidy transcripts in preparation to be spoken. See [Considerations](#Considerations).
`text` | `String` | null | Manually set transcript to be spoken. If set, `transcript` Setting will be ignored.
`rate` | `Number` | null | Optionally set [rate of speech](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#dfn-utterancerate) as a value between `0.1` and `10`.
`pitch` | `Number` | null | Optionally set [pitch fo speech](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#dfn-utterancepitch) as a value between `0` and `2`.
`volume` | `Number` | null | Optionally set [volume of speech](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#dfn-utterancevolume) as a value between `0` and `1`.
`unspeakable` | `String` | `'[muted]'` | Used with `jQuery.find` to select and remove unspeakable elements. Set to `null` or `false` to disable
`enunciate` | `String` | `'enunciate'` | Data attribute used for enunciation considerations.

`voice`, `lang`, `transcript`, `text`, `rate`, `pitch`, and `volume`, Settings can also be set via `data-voice`, `data-lang`, `data-transcript`, `data-text`, `data-rate`, `data-pitch`, and `data-volume`,  attributes respectively. When present these data attribues will override settings passed to `.speakable()`.

### Events
All events settings are passed directly along to the [`speechSynthesis api`](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#utterance-events).

Event | Description | 
------| ----------- | 
`onstart` | Fired when this utterance has begun to be spoken.
`onend` | Fired when this utterance has completed being spoken. If this event fires, the error event must not be fired for this utterance.
`onerror` | Fired if there was an error that prevented successful speaking of this utterance. If this event fires, the end event must not be fired for this utterance.
`onpause` | Fired when and if this utterance is paused mid-utterance.
`onresume` | Fired when and if this utterance is resumed after being paused mid-utterance. Adding the utterance to the queue while the global SpeechSynthesis instance is in the paused state, and then calling the resume method does not cause the resume event to be fired, in this case the utterance's start event will be called when the utterance starts.
`onboundary` | Fired when the spoken utterance reaches a word or sentence boundary. The user agent must fire this event if the speech synthesis engine provides the event.

### Considerations
When a transcript is prepared to be spoken it is first processed allowing for the following considerations.

Attribute | Description |
--------- | ----------- |
`data-enunciate` | Text to read aloud rather than `innerHTML`
`muted` | Ensures the element, and any children are never spoken of

Example
```html
<h3 class="speakable" data-transcript="story">Listen to this</h3>
<p id="story">
  <span data-enunciate="You Only Live Once">YOLO</span>. This is a <span muted>made up </span> story.
</p>
```