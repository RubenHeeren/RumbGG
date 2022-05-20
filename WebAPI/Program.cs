var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORSPolicy",
        builder =>
        {
            builder.WithOrigins("https://localhost:7046",
                "https://thankful-ocean-0251cc303.azurestaticapps.net");
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API serving Riot Games API data");
    swaggerUIOptions.RoutePrefix = "";
});

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("CORSPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
