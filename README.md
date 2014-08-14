# (╯°□°)╯ tableflip

## let them flip out, and then ask why

tableflip makes a homepage flippable
and lets angry visitors (╯°□°)╯ ︵ ┻━┻
if something is broken.

But a (╯°□°)╯ ︵ ┻━┻ would be
kind of useless without feedback
so tableflip will ask for it.

## Usage

Either include the smart script that self-initiate
```html
<script type="text/javascript" size="large" key="untilauthisimplemented" position="bottom left" email="pierrereimertz+tableflip@gmail.com" message="Im sorry you flipped out and that I broke your heart." src="http://tableflip.co/dist/tableflip.min.js"></script>
```

or initiate whenever you want
```html
<script src="http://tableflip.co/dist/tableflip.min.js"></script>
```
+
```javascript
tableFlip.init({size : "large", key : "untilauthisimplemented", position : "bottom left", email : "pierrereimertz+tableflip@gmail.com", message="Im sorry you flipped out and that I broke your heart."});
```

## API

### size: "small|medium|large"

### position: "left|right|top|bottom"

### email: "pierrereimertz+tableflip@gmail.com"
This is the email that messages will get sent to, and yes, + is allowed

### message: "Im sorry you flipped.."
If you want, you can add a personal message to the user. It has to be less that 65 characters.

### key: "untilauthisimplemented"
Im about to implement a auth service to protect both you and me, but at the
momement, the only key allowed is "untilauthisimplemented"

## Demo

www.tableflip.co



