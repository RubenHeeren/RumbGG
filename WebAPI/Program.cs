var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Test change 2

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORSPolicy",
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000",
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
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("CORSPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
