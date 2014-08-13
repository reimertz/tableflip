# tableflip.co

## (╯°□°）╯︵ ┻━┻ any homepage

Want to give your users the ability to table flip if your shit is broken?
Install TableFlip.js and let your users flip it and then tell you whats wrong.

Usage:

```html
  <script 
    type="text/javascript" 
    size="small"
    auth-key="untilauthisimplemented"
    position="top left"
    email="pierre@pierrereimertz.com"
    message="Im sorry you flipped out. What did I do to break your heart?" 
    src="http://tableflip.co/cdn/tableflipco/tableflip.min.js">
  </script>
```

```html
  <script src="http://reimertz.co/cdn/tableflipco/tableflip.min.js"></script>
```

```javascript
tableFlip.init({
  size:"small",
  key:"untilauthisimplemented",
  position:"top right",
  email:"pierre+tableflip@pierrereimertz.com",
  message:"Im sorry you flipped out. What did I do to break your heart?" 
});
```



size=["small","medium","large"]

auth-key=["untilauthisimplemented"] //fixed for now..

position=["left", "right", "bottom", "right"] //"left bottom" is default

email=["address@wheremessagegetsent.to"]

message=["A personal message from you"] //Optional, max-length is 65 characters.


![](https://rawgit.com/reimertz/tableflip.js/master/common/tableflip.gif "so much flip")
