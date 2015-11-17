<% if signed_in? %>
  <%= "Current User: #{current_user.username}" %>

  <form action="<%= session_url %>" method="POST" >
    <input type="hidden" name="_method" value="Delete">
    <input type="hidden" name="authenticity_token" value="<%=form_authenticity_token%>">

    <button>Sign Out</button>
  </form>

<% else %>
  <% unless request.path_info.include?('/session/new') %>
    <form action="<%= new_session_url %>" method="GET">

      <button>Sign In</button>
    </form>
  <% end %>
  <% unless request.path_info.include?('/users') %>
    <form action="<%= new_user_url %>" method="GET" >
      <button>Create New Account</button>
    </form>
  <% end %>
<% end %>
