---
title: Lessons Learned - Responsive Design from 10,000 feet
layout: post
---
One of my main goals while making this website was to get a much better grasp on implementing Responsive Design. For those unaware, this is the methodology of making a website adapt to what it's being displayed on. It's what gives mobile users the hamburger icon, while desktop users get the full conventional navbar. I've learned a good amount, so to both cement my knowledge a little better and to maybe help some others, here is a nutshell explanation of Responsive Design, focusing on some specific implementations.

![How the homepage looks on a phone, tablet, laptop and monitor]({{ site.url }}/images/posts/amiresponsive.jpg)
*Conventional device size rendering using [Am I Responsive?](http://ami.responsivedesign.is/)*

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