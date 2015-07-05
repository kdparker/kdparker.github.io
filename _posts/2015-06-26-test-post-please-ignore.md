---
title: Test Post please ignore
layout: post
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

## Center content with a max-width

{% highlight html %}
<div class="container">
  <div class="content">
     ...
  </div>
</div>
{% endhighlight %}

{% highlight css %}
.container {
    width: 100%;
}

.content {
    width: 100%;
}

@media screen and (min-width: 900px) {
    .content {
        max-width: 900px;
    }
}
{% endhighlight %}