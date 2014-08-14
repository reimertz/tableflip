# tableflip

## (╯°□°）╯︵ ┻━┻ any homepage

Want to give your users the ability to table flip if your shit is broken?
Install TableFlip.js and let your users flip it and then tell you whats wrong.

Usage:

Either you just include the script and add the proper attributes and the
script will auto launch.

```html
  <script 
    type="text/javascript" 
    size="small"
    key="untilauthisimplemented"
    position="top left"
    email="pierre@pierrereimertz.com"
    message="Im sorry you flipped out. What did I do to break your heart?" 
    src="http://tableflip.co/dist/tableflip.min.js">
  </script>
```

Or, if you prefer to initiate it yourself, just include the script as normal.

```html
  <script src="http://tableflip.co/dist/tableflip.min.js"></script>
```

And then initiate it by calling tableFlip.init(options);

```javascript
tableFlip.init({
  size:"small",
  key:"untilauthisimplemented",
  position:"top right",
  email:"pierre+tableflip@pierrereimertz.com",
  message:"Im sorry you flipped out. What did I do to break your heart?" 
});
```


![](https://rawgit.com/reimertz/tableflip.js/master/common/tableflip.gif "so much flip")
